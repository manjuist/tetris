import './index.scss';

(function fn() {
  // 生成随机数
  const random = function random(...minAndMax:number[]): number {
    // 获取参数个数
    const len: number = minAndMax.length;
    // 根据参数个数决定随机数取值范围
    const num = (function iffe(l: number): number[] {
                interface MinMaxObj {
                    '0': number[];
                    '1': number[];
                    '2': number[];
                    [propName: string]: number[];
                }
                const numHandler: MinMaxObj = {
                  0: [0, 1],
                  1: [0, minAndMax[0]],
                  2: [minAndMax[0], minAndMax[1]],
                };
                return numHandler[l];
    }(len));
    const maxNum = num[1];
    const minNum = num[1];
    const result = Math.random() * (maxNum - minNum + 1) + minNum;
    // 获取随机数
    // return parseInt(result);
    return Math.floor(result);
  };

    interface Ele {
        addEventListener?: Function;
        attchEvent?: Function;
        [propName: string]: any;
    }
    // 事件
    const eventUtil = {
      addHandler(element: Ele, type: string, handler: Function) {
        const ele = element;
        if (ele.addEventListener) {
          ele.addEventListener(type, handler, false);
        } else if (ele.attchEvent) {
          ele.attachEvent(`on${type}`, handler);
        } else {
          ele[`on${type}`] = handler;
        }
      },
      removeHandler(element: Ele, type: string, handler: Function) {
        const ele = element;
        if (ele.romeveEventListener) {
          ele.romeveEventListener(type, handler, false);
        } else if (ele.detachEvent) {
          ele.detachEvent(`on${type}`, handler);
        } else {
          ele[`on${type}`] = null;
        }
      },
    };

    // element
    const element = function element(color: string) {
      const div = document.createElement('div');
      if (color) {
        div.style.backgroundColor = color;
        return div;
      }
      return div;
    };

    // extend
    const extend = function copy(_old: {[propName: string]: any}) {
      let newObj: any;
      function recursion(oldObj: {[propName: string]: any}) {
        for (const val in oldObj) {
          if (
            oldObj[val].constructor === Object
                    || oldObj[val].constructor === Array
          ) {
            newObj[val] = copy(oldObj[val]);
          } else {
            newObj[val] = oldObj[val];
          }
        }
      }
      if (_old.constructor === Object) {
        newObj = {};
        recursion(_old);
      } else if (_old.constructor === Array) {
        newObj = [];
        recursion(_old);
      } else {
        newObj = _old;
      }
      return newObj;
    };

    function moveOrigin(keyCode: number, m:Matrix) {
      switch (keyCode) {
        case 37: {
          m.theShape.left();
          break;
        }
        case 38: {
          m.theShape.top();
          break;
        }
        case 39: {
          m.theShape.right();
          break;
        }
        case 40: {
          m.theShape.down();
          break;
        }
        default: {
          break;
        }
      }
    }
    // 移动方向
    eventUtil.addHandler(window, 'keydown', (e: {
        [propName: string]: any;
    }) => {
      const event: {[propName: string]: any} = e;
      const { keyCode } = event;
      moveOrigin(keyCode);
    });

    let status = 0;
    eventUtil.addHandler(
      document.getElementsByClassName('start')[0],
      'click',
      () => {
        if (status === 0) {
          init();
        }
      },
    );

    eventUtil.addHandler(
      document.getElementsByClassName('pause')[0],
      'click',
      function (this: {[propName: string]: any}) {
        if (status === 1) {
          status = 0;
          this.innerHTML = '继续';
          clearTimeout(timer);
        } else {
          status = 1;
          this.innerHTML = '暂停';
          timeout();
        }
      },
    );

    // matrix
    class Matrix {
        row: number | 0;

        col: number | 0;

        tempMatrix: [][];

        theShape: {[propName: string]: any};

        matrix: number[][];

        needNew: boolean;

        box: HTMLElement | null;

        constructor(
          box: HTMLElement | null,
          configure: {row?: number | 0; col?: number | 0} | {row: 0; col: 0},
        ) {
          this.row = configure.row || 24;
          this.col = configure.col || 16;
          // 网格不停变换的临时状态
          this.tempMatrix = [];
          // 新形状
          this.theShape = {};
          // 网格最终状态
          this.matrix = this.initMatrix();
          this.needNew = false;
          this.box = box;
        }

        initMatrix() {
          const temp = [];
          // 矩阵
          for (let i = 0; i < this.row; i++) {
            temp.push(new Array(this.col));
          }
          return temp;
        }

        shape(shapeInstance: Shape) {
          this.theShape = shapeInstance;
          return this;
        }

        render() {
          const tempBox = document.createDocumentFragment();
          // 根据矩阵在页面输出
          for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
              if (this.tempMatrix[i][j] === 1) {
                tempBox.appendChild(element('#000'));
              } else {
                tempBox.appendChild(element(''));
              }
            }
          }
          box && box.appendChild(tempBox);
          return this;
        }

        // 将shape的坐标插入matrix
        merge(matrix?: number[][]) {
          if (!matrix) {
            const temp = extend(this.matrix);
            if (this.theShape) {
              // 将形状插入矩阵
              for (let j = 0; j < 4; j++) {
                // 行
                const y = this.theShape.squre[j][1];
                // 列（形状出现在中间，而不是最左侧）
                const x = this.theShape.squre[j][0] + 7;
                // 行，列
                temp[y][x] = 1;
              }
            }
            // 返回包含矩阵和形状的对象
            this.tempMatrix = temp;
            return this;
          }
          for (let n = 0; n < 4; n++) {
            const p = this.theShape.squre[n][1];
            const q = this.theShape.squre[n][0] + 7;
            m.matrix[p][q] = 1;
          }
          return this;
        }
    }

    // shape
    class Shape {
        ele: number[][][];

        color: string;

        squre: number[][];

        m: Matrix;

        constructor(m: Matrix) {
          this.ele = [
            [[0, 0], [1, 0], [0, 1], [1, 1]],
            [[0, 0], [0, 1], [0, 2], [0, 3]],
            [[1, 0], [2, 0], [0, 1], [1, 1]],
            [[0, 0], [1, 0], [1, 1], [2, 1]],
            [[0, 0], [1, 0], [2, 0], [2, 1]],
            [[0, 0], [1, 0], [1, 1], [1, 2]],
            [[1, 0], [0, 1], [1, 1], [1, 2]],
          ];
          this.color = '#000';
          this.squre = this.ele[random(6)];
          this.m = m;
        }

        left() {
          if (this.leftBorder()) {
            for (let i = 0; i < 4; i++) {
              this.squre[i][0] -= 1;
            }
            this.m.merge().render();
          }
        }

        top() {
          const cx = Math.round(
            (this.squre[0][0]
                    + this.squre[1][0]
                    + this.squre[2][0]
                    + this.squre[3][0])
                    / 4,
          );
          const cy = Math.round(
            (this.squre[0][1]
                    + this.squre[1][1]
                    + this.squre[2][1]
                    + this.squre[3][1])
                    / 4,
          );
          for (let i = 0; i < 4; i++) {
            const x = this.squre[i][0];
            const y = this.squre[i][1];
            this.squre[i][0] = cx - y + cy;
            this.squre[i][1] = cy + x - cx;
          }
          this.m.merge().render();
        }

        right() {
          if (this.rightBorder()) {
            for (let i = 0; i < 4; i++) {
              this.squre[i][0] += 1;
            }
            this.m.merge().render();
          }
        }

        down(value: number) {
          const val = value || 1;
          if (this.bottomBorder()) {
            for (let i = 0; i < 4; i++) {
              this.squre[i][1] += val;
            }
            this.m.merge().render();
          } else {
            clearInterval(timer);
            this.m.merge(this.m.matrix);
            init();
          }
        }

        leftBorder() {
          for (let i = 0; i < 4; i++) {
            if (this.squre[i][0] <= -7) {
              return false;
            } if (
              m.matrix[this.squre[i][1]][this.squre[i][0] + 6] === 1
            ) {
              return false;
            }
          }
          return true;
        }

        rightBorder() {
          for (let i = 0; i < 4; i++) {
            if (this.squre[i][0] >= m.col - 8) {
              return false;
            } if (
              m.matrix[this.squre[i][1]][this.squre[i][0] + 8] === 1
            ) {
              return false;
            }
          }
          return true;
        }

        bottomBorder() {
          for (let i = 0; i < 4; i++) {
            if (this.squre[i][1] >= m.row - 1) {
              return false;
            } if (
              m.matrix[this.squre[i][1] + 1][this.squre[i][0] + 7] === 1
            ) {
              return false;
            }
          }
          return true;
        }
    }

    const box = document.getElementById('js-game');
    var m = new Matrix(box, {});
    let timer: number;
    function timeout() {
      timer = setInterval(() => {
        m.merge().render();
        m.theShape.down();
      }, 1000);
    }

    var init = function () {
      status = 1;
      for (let i = m.matrix.length - 1; i >= 0; i--) {
        const ary = m.matrix[i];
        let n = 0;
        for (let j = 0; j < ary.length; j++) {
          if (ary[j] === 1) {
            n += 1;
          }
        }
        if (n === 16) {
          m.matrix.splice(i, 1);
          m.matrix.unshift(new Array(16));
          i = m.matrix.length;
        }
      }
      m.shape(new Shape(m));
      m.merge().render();
      timeout();
    };
}.call(window));
