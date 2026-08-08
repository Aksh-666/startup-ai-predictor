import pandas as pd

datasets = {
    "Crunchbase": "dataset/crunchbase.csv",
    "YC": "dataset/yc_companies.csv",
    "Indian": "dataset/indian_startup.csv"
}

for name, path in datasets.items():
    print("\n" + "=" * 70)
    print(name)
    print("=" * 70)

    try:
        df = pd.read_csv(path)

        print("Shape:")
        print(df.shape)

        print("\nColumns:")
        print(df.columns.tolist())

        print("\nMissing Values:")
        print(df.isnull().sum())

    except Exception as e:
        print("Error:", e)