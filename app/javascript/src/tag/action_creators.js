import request from 'src/_helpers/request';

function setTags(payload) {
  return {type: 'tag/SET', payload};
}

function fetchTags() {
  return (dispatch) => {
    request({
      method: 'get',
      url: '/tags',
      success: (data) => {
        dispatch(setTags(data.tags));
      },
    });
  };
}

export {setTags, fetchTags};
