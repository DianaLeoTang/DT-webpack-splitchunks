const { parse } = require('@babel/parser'); // 引入 Babel 解析器，用于将代码解析成 AST
const traverse = require('@babel/traverse').default; // 引入 Babel 遍历器，用于遍历和修改 AST
const core = require('@babel/core'); // 引入 Babel 核心模块，用于代码转换
module.exports = function (source) { // 导出 webpack loader 函数，接收源代码作为参数
  const ast = parse(source, { // 将源代码解析成抽象语法树
    sourceType: 'unambiguous', // 自动检测模块类型（ES6 或 CommonJS）
    strictMode: false, // 不使用严格模式
    plugins: ['typescript', 'jsx', 'dynamicImport'], // 支持 TypeScript、JSX 和动态导入语法
  });

  traverse(ast, { // 遍历 AST 节点
    CallExpression(path) { // 处理函数调用表达式节点
      const memberExpression = path.node.callee; // 获取被调用的函数表达式
      if (memberExpression.object && memberExpression.object.name === 'console') { // 检查是否是 console 对象的方法调用
        path.remove(); // 如果是 console 调用，则从 AST 中移除该节点
      }
    },
  });

  const { code } = core.transformFromAst(ast); // 将修改后的 AST 转换回 JavaScript 代码
  return Buffer.from(code); // 将代码转换为 Buffer 并返回
};
