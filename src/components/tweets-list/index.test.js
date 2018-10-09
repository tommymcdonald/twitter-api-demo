import React from 'react';
import TweetsList from './index';
import { shallow } from 'enzyme';

import mockTweets from './test-data/tweets';

const wrapper = shallow(<TweetsList tweets={mockTweets}/>);

describe('Tweet Component', () => {
  it('should render', () => {
    expect(wrapper.length).toEqual(1);
  })
});
