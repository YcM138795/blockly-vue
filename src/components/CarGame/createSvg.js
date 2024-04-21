import Blockly from 'blockly'

class MyIcon extends Blockly.icons.Icon {
    // The constructor should always take in the source block so that svg elements
    // can be properly created.
    constructor(sourceBlock) {
      super(sourceBlock);
    }
    getType() {
      return new Blockly.icons.IconType('my_icon');
    }
    initView(pointerdownListener) {
    if (this.svgRoot) return;  // Already initialized.
  
    // This adds the pointerdownListener to the svgRoot element.
    // If you do not call `super` you must do this yourself.
    super.initView(pointerdownListener);
  
    Blockly.utils.dom.createSvgElement(
      Blockly.utils.Svg.IMAGE,  // 使用 Blockly.utils.Svg.IMAGE 来表示创建 image 元素
      {
        'href': '1_lychee.png',  // 图标的 URL，确保提供正确的图标路径
        'width': '16',  // 图标的宽度
        'height': '16',  // 图标的高度
        'x': '0',  // 图标在 x 轴的位置
        'y': '0',  // 图标在 y 轴的位置
        'class': 'my-css-class'  // CSS 类（如果需要，可以指定样式）
      },
      
      this.svgRoot  // Append to the svgRoot.
    );
   
  } getSize() {
      return new Blockly.utils.Size(16, 16);
    }
    getWeight() {
      return 10;
    }
    onClick() {
      // Do something when clicked.
      console.log(1111);
    }
  }
  Blockly.icons.registry.register(
    new Blockly.icons.IconType('my_icon'), MyIcon);
  