import config from '@/config';
const flowchart = {
    state: {
        currentItem: {
            id: null,
            type: null,
            model: null
        },
        clipboard: null,
        log: {
            current: null,
            list: []
        },
        toolList: [
            {
              name: config.system.title,
              label: 'logo',
              lang: 'Редактор блок-схем',
              type: 'text',
              icon: '',
              enable: true,
              disabled: false,
              mode: ['edit', 'preview'],
              divider: false,
              shortcuts: '',
              toolbar: {
                enable: true,
                position: 'left'
              },
              contextmenu: {
                enable: false,
                target: []
              }
            },
            {
                name: 'undo',
                label: 'Undo',
                lang: 'Отмена',
                type: 'normal',
                icon: 'undo',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: []
                }
            },
            {
                name: 'redo',
                label: 'Redo',
                lang: 'Повторить',
                type: 'normal',
                icon: 'redo',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: true,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: []
                }
            },
            {
                name: 'copy',
                label: 'Copy',
                lang: 'Скопировать',
                type: 'normal',
                icon: 'copy',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: 'mod+c',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['node', 'edge']
                }
            },
            {
                name: 'paste',
                label: 'Paste',
                lang: 'Вставить',
                type: 'normal',
                icon: 'paste',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: 'mod+v',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                }
            },
            {
                name: 'delete',
                label: 'Delete',
                lang: 'Очистить',
                type: 'normal',
                icon: 'delete',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: true,
                shortcuts: 'del',
                toolbar: {
                    enable: false,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['node', 'edge']
                }
            },
            {
                name: 'clear',
                label: 'Clear',
                lang: 'Очистить',
                type: 'normal',
                icon: 'clear',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: true,
                shortcuts: 'ctrl+shift+c',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas']
                }
            },
            {
                name: 'zoom',
                label: 'Zoom',
                lang: 'Увеличить',
                type: 'dropdown-list',
                icon: 'zoom',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: false,
                    target: []
                },
                selected: 0,
                lockLabel: true,
                children: [{
                        name: '25%',
                        label: '25%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 0.25,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: '50%',
                        label: '50%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 0.5,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: '75%',
                        label: '75%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 0.75,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: '100%',
                        label: '100%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 1,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: '125%',
                        label: '125%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 1.25,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: '150%',
                        label: '150%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 1.5,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: '200%',
                        label: '200%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 2,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: '300%',
                        label: '300%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 3,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: '400%',
                        label: '400%',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        data: 4,
                        enable: true,
                        disabled: false,
                        divider: false
                    }
                ]
            },
            {
                name: 'zoomIn',
                label: 'Zoom In',
                lang: 'Увеличить (Ctrl + +)',
                type: 'normal',
                icon: 'zoom-in',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: false,
                shortcuts: ['mod+=', 'mod+plus'],
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                }
            },
            {
                name: 'zoomOut',
                label: 'Zoom Out',
                lang: 'Уменьшить (Ctrl + -)',
                type: 'normal',
                icon: 'zoom-out',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: false,
                shortcuts: 'mod+-',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                }
            },
            {
                name: 'fit',
                label: 'Fit',
                lang: 'Сбросить (Ctrl + 0)',
                type: 'normal',
                icon: 'fit',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: false,
                shortcuts: 'mod+0',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                }
            },
            {
                name: 'actualSize',
                label: 'Actual Size',
                lang: 'Оригинальный размер (Ctrl + 1)',
                type: 'normal',
                icon: 'actual-size',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: true,
                shortcuts: 'mod+1',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                }
            },
            {
                name: 'fill',
                label: 'fill',
                lang: 'Цвет заливки',
                type: 'dropdown-color-picker',
                icon: 'fill',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['node', 'edge']
                }
            },
            {
                name: 'lineColor',
                label: 'line color',
                lang: 'Цвет обводки',
                type: 'dropdown-color-picker',
                icon: 'line-color',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['node', 'edge']
                }
            },
            {
                name: 'lineWidth',
                label: 'line width',
                lang: 'Ширина обводки',
                type: 'dropdown-list',
                icon: 'line-width',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['node', 'edge']
                },
                selected: 0,
                lockLabel: true,
                children: [{
                        name: 1,
                        label: '1px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 2,
                        label: '2px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 3,
                        label: '3px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 4,
                        label: '4px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 5,
                        label: '5px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 6,
                        label: '6px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 7,
                        label: '7px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 8,
                        label: '8px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 9,
                        label: '9px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 10,
                        label: '10px',
                        lang: '',
                        type: 'normal',
                        icon: '',
                        enable: true,
                        disabled: false,
                        divider: false
                    }
                ]
            },
            {
                name: 'lineStyle',
                label: 'line style',
                lang: 'Стиль обводки',
                type: 'dropdown-list',
                icon: 'line-style',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: true,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['node', 'edge']
                },
                // 默认选中项index
                selected: 0,
                lockLabel: false,
                // 子节点
                children: [{
                        name: 'solid',
                        label: 'solid',
                        lang: '',
                        type: 'normal',
                        icon: 'solid',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'dashed',
                        label: 'dashed',
                        lang: '',
                        type: 'normal',
                        icon: 'dashed',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'dot',
                        label: 'dot',
                        lang: '',
                        type: 'normal',
                        icon: 'dot',
                        enable: true,
                        disabled: false,
                        divider: false
                    }
                ]
            },
            {
                name: 'lineType',
                label: 'line type',
                lang: 'Тип стрелки',
                type: 'dropdown-list',
                icon: '',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['edge']
                },
                // 默认选中项index
                selected: 0,
                lockLabel: false,
                // 子节点
                children: [{
                        name: 'x-line',
                        label: 'line',
                        lang: '',
                        type: 'normal',
                        icon: 'flow-line',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'x-broken',
                        label: 'broken',
                        lang: '',
                        type: 'normal',
                        icon: 'flow-broken',
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'x-cubic',
                        label: 'cubic',
                        lang: '',
                        type: 'normal',
                        icon: 'flow-curve',
                        enable: true,
                        disabled: false,
                        divider: false
                    }
                ]
            },
            {
                name: 'startArrow',
                label: 'start arrow',
                lang: 'Начало стрелки',
                type: 'dropdown-list',
                icon: '',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['edge']
                },
                // 默认选中项index
                selected: 0,
                lockLabel: false,
                // 子节点
                children: [{
                        name: 'none',
                        label: 'none',
                        lang: '',
                        type: 'normal',
                        icon: 'solid',
                        style: {},
                        data: false,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'solidArrow',
                        label: 'solid arrow',
                        lang: '',
                        type: 'normal',
                        icon: 'solid-arrow',
                        style: {},
                        data: {
                            path: 'M10,0 L-10,-10 L-10,10 Z',
                            d: 10
                        },
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'normalArrow',
                        label: 'normal arrow',
                        lang: '',
                        type: 'normal',
                        icon: 'normal-arrow',
                        style: {},
                        data: {
                            path: 'M10,0 L-10,10 L-10.707,9.293 L8.568,0 L-10.707,-9.293 L-10,-10 Z',
                            d: 10
                        },
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'asynchArrow',
                        label: 'asynch arrow',
                        lang: '',
                        type: 'normal',
                        icon: 'asynch-arraw',
                        style: {},
                        data: {
                            path: 'M10,0 L-10,10 L-10.707,9.293 L8.568,0 Z',
                            d: 10
                        },
                        enable: true,
                        disabled: false,
                        divider: false
                    }
                ]
            },
            {
                name: 'endArrow',
                label: 'end arrow',
                lang: 'Конец стрелки',
                type: 'dropdown-list',
                icon: '',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: true,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['edge']
                },
                // 默认选中项index
                selected: 0,
                lockLabel: false,
                // 子节点
                children: [{
                        name: 'none',
                        label: 'none',
                        lang: '',
                        type: 'normal',
                        icon: 'solid',
                        style: {},
                        data: false,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'solidArrow',
                        label: 'solid arrow',
                        lang: '',
                        type: 'normal',
                        icon: 'solid-arrow',
                        style: {
                            display: 'inline-block',
                            transform: 'rotate(180deg)'
                        },
                        data: {
                            path: 'M10,0 L-10,-10 L-10,10 Z',
                            d: 10
                        },
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'normalArrow',
                        label: 'normal arrow',
                        lang: '',
                        type: 'normal',
                        icon: 'normal-arrow',
                        style: {
                            display: 'inline-block',
                            transform: 'rotate(180deg)'
                        },
                        data: {
                            path: 'M10,0 L-10,10 L-10.707,9.293 L8.568,0 L-10.707,-9.293 L-10,-10 Z',
                            d: 10
                        },
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'asynchArrow',
                        label: 'asynch arrow',
                        lang: '',
                        type: 'normal',
                        icon: 'asynch-arraw',
                        style: {
                            display: 'inline-block',
                            transform: 'rotate(180deg)'
                        },
                        data: {
                            path: 'M10,0 L-10,10 L-10.707,9.293 L8.568,0 Z',
                            d: 10
                        },
                        enable: true,
                        disabled: false,
                        divider: false
                    }
                ]
            },
            {
                name: 'edit',
                label: 'edit',
                lang: 'flowchart.L10023',
                type: 'normal',
                icon: 'edit',
                enable: true,
                disabled: false,
                mode: ['preview'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: false,
                    target: []
                }
            },
            {
                name: 'preview',
                label: 'preview',
                lang: 'flowchart.L10024',
                type: 'normal',
                icon: 'preview',
                enable: true,
                disabled: false,
                mode: ['edit'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: false,
                    target: []
                }
            },
            {
                name: 'download',
                label: 'download',
                lang: 'Скачать',
                type: 'dropdown-list',
                icon: 'download',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                },
                selected: 0,
                lockLabel: true,
                children: [{
                        name: 'image',
                        label: 'Image',
                        lang: '',
                        type: 'normal',
                        icon: 'image',
                        style: {},
                        data: false,
                        enable: true,
                        disabled: false,
                        divider: false
                    },
                    {
                        name: 'json',
                        label: 'Json',
                        lang: '',
                        type: 'normal',
                        icon: 'json',
                        style: {},
                        data: false,
                        enable: true,
                        disabled: false,
                        divider: false
                    }
                ]
            },
            {
                name: 'fullscreen',
                label: 'fullscreen',
                lang: 'Полноэкранный',
                type: 'normal',
                icon: 'full-screen',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'center'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                }
            },
            {
                name: 'github',
                label: '',
                lang: 'flowchart.L10027',
                type: '',
                icon: '',
                link: '',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'right'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                }
            },
            {
                name: 'feedback',
                label: '',
                lang: 'flowchart.L10028',
                type: '',
                icon: '',
                link: '',
                enable: true,
                disabled: false,
                mode: ['edit', 'preview'],
                divider: false,
                shortcuts: '',
                toolbar: {
                    enable: true,
                    position: 'right'
                },
                contextmenu: {
                    enable: true,
                    target: ['canvas', 'node', 'edge']
                }
            }
        ]

    },

    mutations: {
        'editor/currentItem/update': (state, data) => {
            state.currentItem = data
        },
        'editor/toolList/update': (state, data) => {
            state.toolList = data
        },
        'editor/log/update': (state, data) => {
          if (!data.hasOwnProperty('action') || !data.action) {
                return
            }
            let oldLog = state.log
            let log = {
                current: null,
                list: []
            }
            switch (data.action) {
                // 记录
                case 'record':
                    log.list = [
                        ...oldLog.list,
                        JSON.parse(JSON.stringify(data.data))
                    ]
                    log.current = log.list.length - 1
                    break
                    // 撤销
                case 'undo':
                    log.list = [
                        ...oldLog.list
                    ]
                    log.current = oldLog.current - 1 < 0 ? null : oldLog.current - 1
                    break
                    // 重做
                case 'redo':
                    log.list = [
                        ...oldLog.list
                    ]
                    if (oldLog.current === null) {
                        log.current = oldLog.list.length ? 0 : null
                    } else {
                        log.current = oldLog.current + 1 > oldLog.list.length - 1 ? oldLog.list.length - 1 : oldLog.current + 1
                    }
                    break
                    // 清空
                case 'clearLog':
                    log = {
                        current: null,
                        list: []
                    }
                    break
            }
            state.log = log
        }
    },

    actions: {

    }
};

export default flowchart