import type {TreeData} from './types';

export const initialTree: TreeData = {
    rootId: 'root',
    items: {
        'root': {
            id: 'root',
            children: ['instructions', 'separator', 'code'],
            hasChildren: true,
            isExpanded: true,
            isChildrenLoading: false,
            data: {
                title: 'root'
            }
        },
        'instructions': {
            id: 'instructions',
            children: ['variable', 'if'],
            hasChildren: true,
            isExpanded: true,
            isChildrenLoading: false,
            data: {
                title: 'Instructions',
                type: 'instructions'
            }
        },
        'if': {
            id: 'if',
            children: [],
            hasChildren: false,
            isExpanded: false,
            isChildrenLoading: false,
            data: {
                title: 'if',
                type: 'ifblock'
            }
        },
        'variable': {
            id: 'variable',
            children: [],
            hasChildren: false,
            isExpanded: false,
            isChildrenLoading: false,
            data: {
                title: 'variable'
            }
        },
        'separator': {
            id: 'separator',
            children: [],
            hasChildren: false,
            isExpanded: false,
            isChildrenLoading: false,
            data: {
                type: 'separator'
            }
        },
        'code': {
            id: 'code',
            children: [],
            hasChildren: false,
            isExpanded: false,
            isChildrenLoading: false,
            data: {
                title: 'code'
            }
        }
    }
};
