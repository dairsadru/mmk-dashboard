import csv
import json
import os
import re

BASE = r"C:\Users\dairb\.openclaw\media\inbound"
FILES = {
    "akb_year": os.path.join(BASE, "АКБ_за_год_всей_команды_-_TDSheet---47d01632-4b0e-41f9-b02d-cdc29b7f0f99.csv"),
    "akb_month": os.path.join(BASE, "АКБ_за_текущий_месяц_всей_команды_TDSheet---3f5ae9e4-a9de-45fb-82b9-64686bb0bc6a.csv"),
    "sales_prev": os.path.join(BASE, "ПРОДАЖИ_ВОЗВРАТЫ_ПРОШЛЫЙ_МЕСЯЦ_ПО_КАТЕГОРИЯМ_ПРОДАЖИ_И_ДЛЯ_З---0c4b855e-eac2-4748-8656-048b91d89777.csv"),
    "sales_curr": os.path.join(BASE, "ПРОДАЖИ_ВОЗВРАТЫ_ТЕКУЩИЙ_МЕСЯЦ_TDSheet---1b7dc0de-6be3-4716-b18e-ed58519fa9da.csv"),
    "real_ataev": os.path.join(BASE, "реализация_за_текущий_месяц_Атаев_Магомед_TDSheet---3cacb656-71df-43fd-b1a1-bd939c29bc47.csv"),
    "real_salavatov": os.path.join(BASE, "реализация_за_текущий_месяц_Салаватов_Рашид_TDSheet---2bf4614c-364c-48e0-9ac1-db542bbcc8e5.csv"),
    "real_tupaeva": os.path.join(BASE, "реализация_за_текущий_месяц_Тупаева_Заира_TDSheet---dd0276f2-dc4f-4d2a-bde1-0e6175a9c316.csv"),
    "real_khasanov": os.path.join(BASE, "реализация_за_текущий_месяц_Хасанов_Руслан---02469c34-c1b1-41c7-b330-9f9ecc3b5afe.csv"),
}

TEAM_NAMES = [
    "Атаев Магомед 89298722289 (Кизилюрт)",
    "Салаватов Рашид Хас (+7 926 920-10-05)",
    "Тупаева Заира (Хас) 89286784499",
    "Хасанов Руслан (Кизляр) 89288754875",
]

REALIZATION_MAP = {
    TEAM_NAMES[0]: FILES["real_ataev"],
    TEAM_NAMES[1]: FILES["real_salavatov"],
    TEAM_NAMES[2]: FILES["real_tupaeva"],
    TEAM_NAMES[3]: FILES["real_khasanov"],
}


def parse_num(value):
    if value is None:
        return None
    s = str(value).strip().replace("\xa0", " ").replace(" ", "")
    if not s:
        return None
    if "," in s and "." in s:
        if s.rfind(",") > s.rfind("."):
            s = s.replace(".", "").replace(",", ".")
        else:
            s = s.replace(",", "")
    else:
        s = s.replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def clean_name(value):
    if value is None:
        return ""
    return re.sub(r"\s+", " ", str(value).replace("¶", " ").strip(' "'))


def read_csv(path):
    with open(path, encoding="utf-8-sig", newline="") as f:
        return list(csv.reader(f))


def collect_akb():
    team = {}
    for row in read_csv(FILES["akb_year"]):
        if len(row) > 10 and row[1].strip() in TEAM_NAMES:
            team[row[1].strip()] = {"year_total": parse_num(row[-1])}
    for row in read_csv(FILES["akb_month"]):
        if len(row) > 8 and row[1].strip() in TEAM_NAMES:
            team.setdefault(row[1].strip(), {})["month_total"] = parse_num(row[-1])
    return team


def collect_sales(path):
    data = {}
    for row in read_csv(path):
        if row and row[0] in TEAM_NAMES:
            data[row[0]] = {
                "sales_qty": parse_num(row[4]),
                "sales_value": parse_num(row[5]),
                "returns_qty": parse_num(row[6]),
                "returns_value": parse_num(row[7]),
                "returns_pct_qty": parse_num(row[8]),
                "returns_pct_value": parse_num(row[9]),
            }
    return data


def collect_realization(path):
    total = 0.0
    docs = 0
    rows = []
    points = {}
    for row in read_csv(path):
        if len(row) < 14:
            continue
        value = parse_num(row[11])
        point = clean_name(row[13])
        date = row[7].strip() if len(row) > 7 else ""
        if value is not None and point:
            total += value
            docs += 1
            rows.append({"point": point, "value": round(value, 2), "date": date})
            bucket = points.setdefault(point, {"point": point, "value": 0.0, "docs": 0, "last_date": ""})
            bucket["value"] += value
            bucket["docs"] += 1
            if date and (not bucket["last_date"] or date > bucket["last_date"]):
                bucket["last_date"] = date
    rows.sort(key=lambda x: x["value"], reverse=True)
    all_points = sorted(
        (
            {
                "point": item["point"],
                "value": round(item["value"], 2),
                "docs": item["docs"],
                "last_date": item["last_date"],
            }
            for item in points.values()
        ),
        key=lambda x: x["value"],
        reverse=True,
    )
    return {
        "realization_total": round(total, 2),
        "documents": docs,
        "top_points": rows[:7],
        "all_points": all_points,
        "points_count": len(all_points),
    }


def main():
    akb = collect_akb()
    prev = collect_sales(FILES["sales_prev"])
    curr = collect_sales(FILES["sales_curr"])
    out = {"team": []}
    for name in TEAM_NAMES:
        row = {"name": name}
        row.update(akb.get(name, {}))
        row["prev"] = prev.get(name, {})
        row["curr"] = curr.get(name, {})
        row.update(collect_realization(REALIZATION_MAP[name]))
        out["team"].append(row)
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    import sys
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    main()
