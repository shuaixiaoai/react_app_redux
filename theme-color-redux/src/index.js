// import createStore from './store';

function reducer (state, action) {
    if(!state) {
        return {
            title: {
                text: 'this is title',
                color: 'red',
            },
            content: {
                text: 'this is content',
                color: 'blue'
            }
        }
    }
    switch (action.type) {
      case 'UPDATE_TITLE_TEXT':
        return { // 构建新的对象并且返回
          ...state,
          title: {
            ...state.title,
            text: action.text
          }
        }
      case 'UPDATE_TITLE_COLOR':
        return { // 构建新的对象并且返回
          ...state,
          title: {
            ...state.title,
            color: action.color
          }
        }
      default:
        return state // 没有修改，返回原来的对象
    }
}
  
function renderApp (appState) {
    renderTitle(appState.title);
    renderContent(appState.content);
}

function renderTitle(title) {
    const titleDom = document.getElementById('title');
    titleDom.innerHTML = title.text;
    titleDom.style.color = title.color;
}

function renderContent(content) {
    const contentDom = document.getElementById('content');
    contentDom.innerHTML = content.text;
    contentDom.style.color = content.color;
}

// renderApp(appState);

// 创建共享状态仓库
// createStore 接受两个参数，一个是表示应用程序状态的 state；
// 另外一个是 stateChanger，它来描述应用程序状态会根据 action 发生的变化
function createStore (reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化state
  return { getState, dispatch, subscribe }
}

const store = createStore(reducer);
renderApp(store.getState());                // 首次渲染页面

// store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '大爷修改了'});
// store.dispatch({ type: 'UPGRADE_TITLE_COLOR', color: 'blue'});
// renderApp(store.getState());