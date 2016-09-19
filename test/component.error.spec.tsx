import * as React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import { MgError } from "../src/api/error";
import { Error } from "../src/components/error";

function throwme() {
    throw new MgError("Uh oh!");
}

function captureError() {
    let err;
    try {
        throwme();
    } catch (e) {
        err = e;
    }
    return err;
}

describe("components/error", () => {
    it("renders a MgError with stack", () => {
        const err = captureError();
        const wrapper = shallow(<Error error={err} />);
        expect(wrapper.find(".error-display")).to.have.length(1);
        expect(wrapper.find(".error-display .error-header")).to.have.length(1);
        expect(wrapper.find(".error-display .error-header").text()).to.be.equal(err.message);
        expect(wrapper.find(".error-display .error-stack")).to.have.length(1);
    });
    it("renders a string without a stack", () => {
        const err = "Uh oh!";
        const wrapper = shallow(<Error error={err} />);
        expect(wrapper.find(".error-display")).to.have.length(1);
        expect(wrapper.find(".error-display .error-header")).to.have.length(1);
        expect(wrapper.find(".error-display .error-header").text()).to.be.equal(err);
        expect(wrapper.find(".error-display .error-stack")).to.have.length(0);
    });
});