class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(childValue) {
    const childNode = new TreeNode(childValue);
    this.children.push(childNode);
    return childNode;
  }
}

module.exports = TreeNode;
