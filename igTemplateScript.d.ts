
/**
 * ユーザー定義の JavaScript 関数を、Ignite UI から参照できるよう登録します。
 * @param name スクリプト名。登録する実際の JavaScript 関数の名称に関係なく、ここで指定した名前で Ignite UI からは参照されます。
 * @param f 登録する JavaScript 関数
 * @param shouldCall 省略可能で既定値は true。true の場合はファクトリー関数を指定したことを意味します。
*/
declare function igRegisterScript(name: string, f: Function, shouldCall?: boolean): void;

/** 
 *  マーカー描画対象のデータを示します。  
 * */
type IgbBrush = {
    fill: string;
}

/** 
 *  マーカー描画対象のデータを示します。
 *  型引数 TItem には、Blazor 側で DataChart のシリーズ(系列)にバインドする型の JavaScript 側表現を指定します。
 * */
type IgbMarkerTemplateData<TItem> = {
    /** マーカー描画対象のデータ */
    item: TItem,
    /** マーカー描画用の既定の塗りつぶし色 */
    actualItemBrush: IgbBrush
}

/** 
 *  マーカーのサイズ (幅と高さ) を決定するために、Ignite UI が、MarkerTemplateScript の mesure メソッドを呼び出すときの引数型です。
 *  型引数 TItem には、Blazor 側で DataChart のシリーズ(系列)にバインドする型の JavaScript 側表現を指定します。
 * */
type IgbMesureInfo<TItem> = {
    /** マーカー描画先の HTML Canvas 要素の 2D コンテキストオブジェクトが格納されています。 */
    context: CanvasRenderingContext2D,
    /** マーカー描画対象のデータが格納されています。 */
    data: IgbMarkerTemplateData<TItem>,
    /** マーカーの幅 (px単位)。mesure メソッドでこのフィールドを設定する必要があります。*/
    width: number,
    /** マーカーの高さ (px単位)。mesure メソッドでこのフィールドを設定する必要があります。*/
    height: number
}

/** 
 *  マーカーを実際に描画するために、Ignite UI が、MarkerTemplateScript の render メソッドを呼び出すときの引数型です。
 *  型引数 TItem には、Blazor 側で DataChart のシリーズ(系列)にバインドする型の JavaScript 側表現を指定します。
 * */
type IgbRenderInfo<TItem> = {
    /** マーカー描画先の HTML Canvas 要素の 2D コンテキストオブジェクトが格納されています。 */
    context: CanvasRenderingContext2D,
    /** マーカー描画対象のデータが格納されています。 */
    data: IgbMarkerTemplateData<TItem>,
    isHitTestRender: boolean;
    /** マーカーの中心の X 座標 (px単位) が格納されています。 */
    xPosition: number;
    /** マーカーの中心の Y 座標 (px単位) が格納されています。 */
    yPosition: number;
    /** mesure メソッドで算定された、マーカーの有効な幅 (px単位) が格納されています。 */
    availableWidth: number;
    /** mesure メソッドで算定された、マーカーの有効な高さ (px単位) が格納されています。 */
    availableHeight: number;
}
