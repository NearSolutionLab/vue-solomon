import pptxgen from 'pptxgenjs';
import { IMAGE_PATHS, fontFace } from './ppt-enums';

export function initPpt() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  return pptx;
}

export function createMasterSlides(pptx) {
  const background = { color: 'FFFFFF', transparency: 0 };
  const slideNumber = {
    fontFace,
    fontSize: 12,
    x: 6.23,
    y: 6.88,
    color: '3D5874',
    valign: 'middle',
    align: 'center',
    bold: false,
  };
  const leftTopImage = {
    h: 0.28,
    w: 0.63,
    x: 0.19,
    y: 0.19,
    path: IMAGE_PATHS.leftTopImage,
  };
  const footerImage = {
    h: 0.46,
    w: 1.78,
    x: 11.34,
    y: 6.75,
    path: IMAGE_PATHS.logoImage,
  };

  pptx.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background,
    slideNumber,
    objects: [
      { image: leftTopImage },
      { image: footerImage },
      {
        placeholder: {
          options: {
            name: 'header',
            type: 'title',
            h: 0.44,
            w: 9,
            x: 1.19,
            y: 0.09,
            valign: 'middle',
            align: 'left',
            color: '3D5874',
            fontFace,
            fontSize: 24,
            bold: true,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'body',
            type: 'body',
            h: 5.88,
            w: 12.53,
            x: 0.44,
            y: 0.81,
            valign: 'middle',
            align: 'left',
            color: '3D5874',
            fontFace,
            fontSize: 14,
            bold: false,
          },
          text: '',
        },
      },
    ],
  });

  pptx.defineSlideMaster({
    title: 'MASTER_4CHART',
    background,
    slideNumber,
    objects: [
      { image: leftTopImage },
      { image: footerImage },
      {
        placeholder: {
          options: {
            name: 'header',
            type: 'title',
            h: 0.44,
            w: 9,
            x: 1.19,
            y: 0.09,
            valign: 'middle',
            align: 'left',
            color: '3D5874',
            fontFace,
            fontSize: 24,
            bold: true,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart1',
            type: 'chart',
            h: 3,
            w: 5.98,
            x: 0.68,
            y: 0.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart2',
            type: 'chart',
            h: 3,
            w: 6.16,
            x: 6.67,
            y: 0.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart3',
            type: 'chart',
            h: 3,
            w: 5.98,
            x: 0.68,
            y: 3.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart4',
            type: 'chart',
            h: 3,
            w: 6.16,
            x: 6.67,
            y: 3.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
    ],
  });

  pptx.defineSlideMaster({
    title: 'MASTER_5CHART',
    background,
    slideNumber,
    objects: [
      { image: leftTopImage },
      { image: footerImage },
      {
        placeholder: {
          options: {
            name: 'header',
            type: 'title',
            h: 0.44,
            w: 9,
            x: 1.19,
            y: 0.09,
            valign: 'middle',
            align: 'left',
            color: '3D5874',
            fontFace,
            fontSize: 24,
            bold: true,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart1',
            type: 'chart',
            h: 3,
            w: 5.45,
            x: 0.68,
            y: 0.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart2',
            type: 'chart',
            h: 3,
            w: 3.57,
            x: 6.13,
            y: 0.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart3',
            type: 'chart',
            h: 3,
            w: 2.95,
            x: 9.7,
            y: 0.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart4',
            type: 'chart',
            h: 3,
            w: 5.45,
            x: 0.68,
            y: 3.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
      {
        placeholder: {
          options: {
            name: 'chart5',
            type: 'chart',
            h: 3,
            w: 6.16,
            x: 6.13,
            y: 3.69,
            valign: 'middle',
            fontFace,
          },
          text: '',
        },
      },
    ],
  });
}
