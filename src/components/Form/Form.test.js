import React from 'react';
import { mount } from 'enzyme';
import Form from './Form';
import './Form.css'


describe('<Notification/>', () => {
    let wrapper;
    let props = {
        name:'',
        email: '',
        onChange: jest.fn()
    }
    beforeEach(() => {
        wrapper = mount(<Form {...props} />);
    });
    it('Should be rendered', () => {
        let actual = wrapper.find('.form').length;
        expect(actual).toBe(1);
    })
    it('Onchange function called', () => {
          wrapper.find('input').first().simulate('change');
          expect(wrapper.find('input').first().prop('onChange')).toBeCalled();
          wrapper.find('input').at(1).simulate('change');
          expect(wrapper.find('input').first().prop('onChange')).toBeCalled();
    })
    it('Change as per prop value', () => {
        wrapper.setProps({name:'name'});
        wrapper.setProps({email:"me@gmail.com"})
        expect(wrapper.find('input').first().props().value).toBe(wrapper.prop('name'))
        expect(wrapper.find('input').at(1).props().value).toBe(wrapper.prop('email'))
    })

})