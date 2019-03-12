import React from 'react';
import { mount } from 'enzyme';
import Notification from './Notification';
import './Notification.css'

describe('<Notification/>', () => {
    let wrapper;
    let props = {
        message:'some message123'
    }
    beforeEach(() => {
        wrapper = mount(<Notification {...props} />);
    });
    it("should be render", () => {
        const actual = wrapper.find('.notification').length;
        expect(actual).toBe(1);
    });
    it("message should be displayed", () => {
        wrapper.setProps({ message: props.message })        
        const actual = wrapper.find('.notification__message').first().text()
        expect(actual).toBe(wrapper.prop('message'))
        
    })
})
