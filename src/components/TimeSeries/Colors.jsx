const RdYlBu = [
    "#d01f27",
    "#d22527",
    "#d52b28",
    "#d73228",
    "#da3828",
    "#dc3e29",
    "#df4429",
    "#e14b2a",
    "#e4512a",
    "#e6572a",
    "#e95d2b",
    "#eb642b",
    "#ee6a2b",
    "#f0702c",
    "#f2762c",
    "#f57d2c",
    "#f7832d",
    "#f9882e",
    "#f98c31",
    "#fa9033",
    "#fa9436",
    "#fa9738",
    "#fa9b3b",
    "#fb9f3e",
    "#fba340",
    "#fba743",
    "#fbaa46",
    "#fbae48",
    "#fcb24b",
    "#fcb64e",
    "#fcb950",
    "#fcbd53",
    "#fdc155",
    "#fdc558",
    "#fdc85d",
    "#fdca63",
    "#fdcd69",
    "#fdd06f",
    "#fdd275",
    "#fdd57b",
    "#fdd881",
    "#fdda87",
    "#fddd8c",
    "#fde092",
    "#fde298",
    "#fde59e",
    "#fde7a4",
    "#fdeaaa",
    "#fdedb0",
    "#fdefb6",
    "#c7e9f8",
    "#c4e7f7",
    "#c0e5f6",
    "#bde3f6",
    "#b9e1f5",
    "#b5dff4",
    "#b2ddf3",
    "#aedbf2",
    "#abd9f1",
    "#a7d7f1",
    "#a3d5f0",
    "#a0d3ef",
    "#9cd0ee",
    "#99ceed",
    "#95ccec",
    "#91caec",
    "#8ec8eb",
    "#8ac6ea",
    "#87c4e9",
    "#83c2e8",
    "#7fc0e7",
    "#7cbee7",
    "#78bce6",
    "#75bae5",
    "#71b8e4",
    "#6eb4e1",
    "#6bb0df",
    "#68acdc",
    "#65a8d9",
    "#61a4d7",
    "#5ea0d4",
    "#5b9cd1",
    "#5898cf",
    "#5594cc",
    "#5290c9",
    "#4f8cc7",
    "#4c88c4",
    "#4885c1",
    "#4581be",
    "#427dbc",
    "#3f79b9",
    "#3c75b6",
    "#3971b4",
    "#366db1",
    "#3369ae",
    "#2f65ac",
    "#2c61a9",
    "#295da6",
    "#2659a4",
    "#2355a1",
]

// export function applyColormap(nColors, cmap=RdYlBu) {
//     if (nColors === 1) {
//         return ["#f0702c"]
//     } else if (nColors === 3) {
//         return ["#d01f27", "FDC659", "#2355a1"]
//     } else {
//         var result = []
//         for (var i = 0; i < nColors; i++) {
//             var color = cmap[Math.floor((cmap.length-1)*(i/(nColors-1)))]
//             result.push(color)
//         }
//         return result
//     }
// }

export function applyFixedColormap(minVal, maxVal, values, cmap=RdYlBu) {
    console.log("DEBUG applyFixedColormap", minVal, maxVal, values)
    const range = maxVal - minVal;
    var colors = [];
    values.forEach((value, _) => {
        const fractionalDistance = 1 - (value - minVal) / range
        const index = Math.floor((cmap.length - 1) * fractionalDistance)
        const color = cmap[index]
        colors.push(color)
    });
    return colors
}