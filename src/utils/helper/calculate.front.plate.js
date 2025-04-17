const getFrontPlateCost = (module, type) => {
    const key = `${module}-${type}`.toLowerCase();

    const priceMap = {
        "2-polycarbonate": 5428,
        "2-glass": 5428,
        "2-stone": 8142,
        "2-veneer": 8142,

        "3-polycarbonate": 6107,
        "3-glass": 6107,
        "3-stone": 9499,
        "3-veneer": 9499,

        "4-polycarbonate": 6785,
        "4-glass": 6785,
        "4-stone": 10856,
        "4-veneer": 10856,
        "4-polycarbonate with socket": 6785,
        "4-glass with socket": 6785,

        "6-polycarbonate": 8142,
        "6-glass": 8142,
        "6-stone": 13570,
        "6-veneer": 13570,
        "6-polycarbonate with socket": 8142,
        "6-glass with socket": 8142,

        "8-polycarbonate": 8821,
        "8-glass": 8821,
        "8-stone": 16284,
        "8-veneer": 16284,
        "8-polycarbonate with socket": 8821,
        "8-glass with socket": 8821,
    };

    return priceMap[key] || 0;
};

module.exports = getFrontPlateCost;