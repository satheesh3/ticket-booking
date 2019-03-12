import React from 'react';
import { mount } from 'enzyme';
import ShowSeats from './ShowSeats';
import './ShowSeats.css';

describe('<Notification/>', () => {
    let wrapper;
    let props = {
        seats: []
    }
    beforeEach(() => {
        wrapper = mount(<ShowSeats {...props} />);
    });
    it("Should render loading", () => {
        const actual = wrapper.find('div').length;
        expect(actual).toBe(1);
        expect(wrapper.find('div').text()).toBe('Loading seat selection ...')
    });
    it("Should render seats", () => {
        wrapper.setProps({seats:[{id:1, booked:false},{id:2, booked:false}]});
        const actual = wrapper.find('.show-seat').length;
        expect(actual).toBe(1);
        expect(wrapper.find('.show-seat__seat').length).toBe(2);
    })
    it("Check classnames as per props", () => {
        wrapper.setProps({seats:[{id:1, booked:false},{id:2, booked:false}]});
        expect(wrapper.find('.active').length).toBe(0)
        expect(wrapper.find('.booked').length).toBe(0)
        expect(wrapper.find('.self').length).toBe(0)

    })
    it("Check classnames should change when seats change", () => {
        wrapper.setProps({seats:[{id:1, booked:true},{id:2, booked:false}], selected: 1});
        expect(wrapper.find('.active').length).toBe(1)
        expect(wrapper.find('.booked').length).toBe(0)
        expect(wrapper.find('.self').length).toBe(1)
    })
})