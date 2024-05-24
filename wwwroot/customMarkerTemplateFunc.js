"use strict";
// この JavaScript コードを、index.html から script 要素で読み込んでおきます。
// (※ <script src="_content/IgniteUI.Blazor/app.bundle.js"></script> よりあとで読み込む必要があります)
/**
* カスタムのマーカー描画処理機能を返すファクトリー関数を、Ignite UI for Blazor に登録します。
* (マーカー描画処理機能とは、"mesure" と "render" の2つのメソッドを持つオブジェクトです)
* Blazor 側からは、TypeScript/JavaScript 上の関数や変数の名前とは関係なく、この登録時の第一引数で指定した "スクリプト" 名称で参照されます。
* */
igRegisterScript("customMarkerTemplateFunc", () => {
    return {
        /**
         * マーカーをプロットする箇所ごとに呼び出され、マーカーのサイズを設定して返ります。
         * @param measureInfo 描画対象のマーカーの計測情報 (描画対象のデータも含まれます)
         */
        measure: (measureInfo) => {
            // 概要
            // =================
            // mesure メソッドでは、引数に渡された measureInfo の width および height フィールドに、マーカーのサイズ (px単位) を設定して返します。
            // この実装例の説明
            // =================
            // この例では、プロットするデータの Volume プロパティ値に基づいて、
            // その 3倍を半径とした (なので直径はその2倍) 円をマーカーとしてプロットすることとして、
            // width と height を計算・設定しています。
            const item = measureInfo.data.item;
            const size = item.Volume * 3 * 2;
            measureInfo.width = size;
            measureInfo.height = size;
        },
        /**
         * マーカーをプロットする必要が発生するごとに呼び出され、実際に HTML Canvas 上にマーカーを描画します。
         * @param renderInfo 描画対象のマーカーのサイズ情報や、描画先 HTML Canvas の 2D コンテキスト
         */
        render: (renderInfo) => {
            // 概要
            // =================
            // render メソッドでは、実際に・直接 HTML Canvas 要素の 2D コンテキストに対して、マーカーの描画を行ないます。
            // マーカーの描画をすべてこのメソッドに任せられているため、HTML Canvas 要素への描画処理は、(実はマーカーに限らず) 何でもできます。
            // (何でもできる代わりに、すべてのマーカー描画処理はこのメソッド内で自分で実装する必要があります)
            // この実装例の説明
            // =================
            // この例では、先に mesure メソッド呼び出しによって算定された、プロットするデータの Volume プロパティ値に基づくサイズで、
            // その塗りつぶしの色はプロットするデータの Color プロパティ値を採用して、真円のマーカーを、HTML Canvas の 2D コンテキストに対する API 呼び出しで描画します。
            // -----------------
            // 引数に渡された renderInfo に描画のための座標関係の情報がつまっているので、これを取り出しておく
            const { xPosition, yPosition } = renderInfo;
            const halfWidth = renderInfo.availableWidth / 2.0;
            const halfHeight = renderInfo.availableHeight / 2.0;
            // マーカーの塗りつぶしの色は、プロットするデータの Color プロパティ値を使う
            // (ちなみに、既定のマーカーの塗りつぶし色は、renderInfo.data.actualItemBrush.fill に格納されています)
            const color = renderInfo.data.item.Color;
            // HTML Canvas 要素の 2D コンテキストに対して、マーカーの描画を実行
            const ctx = renderInfo.context;
            ctx.beginPath();
            ctx.fillStyle = `rgba(${color.R},${color.G},${color.B},${color.A})`;
            ctx.ellipse(xPosition, yPosition, halfWidth, halfHeight, 0, 0, 360 * Math.PI / 180);
            ctx.fill();
        }
    };
});
