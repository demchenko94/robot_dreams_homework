const TreeNode = require('./home-work-4.js');


describe('TreeNode', () => {
    it('should create a root node with the given value', () => {
        const root = new TreeNode('Root');
        const expectedResult = {
            value: 'Root',
            children: []
        };
        expect(root).toEqual(expectedResult);
    });

    it('should create a tree node with children', () => {
        const root = new TreeNode('Root');
        root.addChild('Child 1');
        root.addChild('Child 2');

        const expectedResult = {
            value: 'Root',
            children: [
                {
                    value: 'Child 1',
                    children: []
                },
                {
                    value: 'Child 2',
                    children: []
                }
            ]
        };
        expect(root).toEqual(expectedResult);
    });

    it('should create a tree node with grandchildren', () => {
        const root = new TreeNode('Root');
        const child1 = root.addChild('Child 1');
        const child2 = root.addChild('Child 2');
        child1.addChild('Grandchild 1.1');
        child1.addChild('Grandchild 1.2');
        child2.addChild('Grandchild 2.1');

        const expectedResult = {
            value: 'Root',
            children: [
                {
                    value: 'Child 1',
                    children: [
                        {
                            value: 'Grandchild 1.1',
                            children: []
                        },
                        {
                            value: 'Grandchild 1.2',
                            children: []
                        }
                    ]
                },
                {
                    value: 'Child 2',
                    children: [
                        {
                            value: 'Grandchild 2.1',
                            children: []
                        }
                    ]
                }
            ]
        };
        expect(root).toEqual(expectedResult);
    });
});
