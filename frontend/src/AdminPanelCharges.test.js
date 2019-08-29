import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import AdminPanelCharges from './AdminPanelCharges';

describe('AdminPanelCharges', function () {
    let wrapper;

    let testDate = {
        id: 24,
        amount: 20,
        description: "sdf",
        due_date: "2019-08-13T07:00:00.000Z",
        paid: false

    }


    beforeEach(() => {
        wrapper = mount(<AdminPanelCharges />);
        wrapper.setState({ testData })
    });

    it('renders without crashing', function () {
        shallow(<AdminPanelCharges />);
    });
});