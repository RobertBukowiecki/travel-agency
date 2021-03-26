import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('corectly link generation', () => {
    const expectedId = 'abc';
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary image={'image'} name={'name'} cost={'cost'} days={1} id={expectedId} tags={[]} />);

    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('image had corect src and alt', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'name';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} cost={'cost'} days={1} id={'id'} tags={[]} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('props name,days,cost are corect', () => {
    const expectedCost = '1000$';
    const expectedDays = 8;
    const expectedName = 'CzangaCzanga';
    const component = shallow(<TripSummary image={'image'} name={expectedName} cost={expectedCost} days={expectedDays} id={'id'} tags={[]} />);

    expect(component.find('.details span').last().text()).toEqual(`from ${expectedCost}`);
    expect(component.find('.details span').first().text()).toEqual(`${expectedDays} days`);
    expect(component.find('.title').text()).toEqual(expectedName);
  });

  it('throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags in spans', () => {
    const expectedTags = ['cat', 'dog', 'fish'];
    const component = shallow(<TripSummary  tags={expectedTags} image={'image'} name={'name'} cost={'cost'} days={1} id={'id'} />);
    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });

  it('if prop tags is false not render spans', () => {
    const component = shallow(<TripSummary image={'image'} name={'name'} cost={'cost'} days={1} id={'id'} />);

    expect(component.hasClass('tags')).toBe(false);
  });
});
