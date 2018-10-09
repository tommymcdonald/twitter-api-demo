import React from 'react';
import Tweet from './index';
import { shallow } from 'enzyme';

import mockTweet from './test-data/tweet';

const wrapper = shallow(<Tweet tweet={mockTweet}/>);

describe('Tweet Component', () => {
  it('should render', () => {
    expect(wrapper.length).toEqual(1);
  })
});
