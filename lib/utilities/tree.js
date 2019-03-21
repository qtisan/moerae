
const treeWalker = (options) => {
  const o = {
    children: 'children',
    ...options
  };
  return function walk(tr, fn) {
    let n = null;
    if (tr && tr.length) {
      for (const [, t] of tr.entries()) {
        if (fn(t)) {
          n = t;
          break;
        } else {
          n = walk(t[o.children], fn);
          if (n) {
            break;
          }
        }
      }
    }
    return n;
  };
};

/**
* 表式数据生成树状数据方法生成的委托方法
* @author lennon
* @param options.id String，id字段的字段名
* @param options.parent String，parent字段的字段名
* @param options.children String，children字段的字段名
* @return Function，返回 toTree(table) 方法
**/
export const treeBuilder = (options) => {
  const opts = {
    id: 'id',
    parent: 'parent_id',
    children: 'children',
    ...options
  };
  const tree = [];
  const walk = treeWalker(opts);
  return function toTree(table) {
    while (table.length) {
      for (let idx = table.length - 1; idx >= 0; idx--) {
        const row = table[idx];
        if (row[opts.parent] == null) {
          tree.push({ ...row });
          table.splice(idx, 1);
        } else {
          const ps = walk(tree, (node) => {
            return row[opts.parent] === node[opts.id];
          });
          if (ps) {
            ps[opts.children] = ps[opts.children] || [];
            ps[opts.children].push({ ...row });
            table.splice(idx, 1);
          }
        }
      }
    }
    return tree;
  };
};

/**
* 表式数据转换为树状数据
* @author lennon
* @param table Array，数组形式的表格，需要包含id: String字段作唯一标识符，parent_id: String字段作父节点标识，children: Array字段作子节点
* @return Object，返回树状对象
**/
export const toTree = treeBuilder();
