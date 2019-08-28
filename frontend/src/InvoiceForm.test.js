import React from 'react';
import { shallow, mount } from 'enzyme';
import InvoiceForm from './InvoiceForm';

it('renders without crashing', function () {
  shallow(<InvoiceForm />);
});


it('Should capture username correctly onChange', function(){
  const component = mount(<InvoiceForm />);
  const input = component.find('input').at(0);
  input.instance().value = 'hello';
  input.simulate('change');
  expect(component.state().invoice.username).toEqual('hello');
})

it('Should capture amount correctly onChange', function(){
  const component = mount(<InvoiceForm />);
  const input = component.find('input').at(1);
  input.instance().value = '500';
  input.simulate('change');
  expect(component.state().invoice.amount).toEqual('500');
})

it('Should capture description correctly onChange', function(){
  const component = mount(<InvoiceForm />);
  const input = component.find('input').at(2);
  input.instance().value = 'Basic test services';
  input.simulate('change');
  expect(component.state().invoice.description).toEqual('Basic test services');
})

it('Should capture due_date correctly onChange', function(){
  const component = mount(<InvoiceForm />);
  const input = component.find('input').at(3);
  input.instance().value = '2019-04-19';
  input.simulate('change');
  expect(component.state().invoice.due_date).toEqual('2019-04-19');
})

