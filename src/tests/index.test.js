import { assert } from 'chai';
import solidityToABI from '../index.js';

describe('solidity-to-abi', () => {
  describe('functional testing', () => {
    it('should convert single input/output Solidity method to ABI', () => {
      const methodABI = solidityToABI('balanceOf(address _addr):(uint256 balance)');

      assert.equal(typeof methodABI, 'object');
      assert.equal(methodABI.type, 'function');
      assert.equal(methodABI.outputs.length, 1);
      assert.equal(methodABI.inputs.length, 1);
      assert.equal(methodABI.name, 'balanceOf');
      assert.equal(methodABI.inputs[0].name, '_addr');
      assert.equal(methodABI.inputs[0].type, 'address');
      assert.equal(methodABI.outputs[0].name, 'balance');
      assert.equal(methodABI.outputs[0].type, 'uint256');
    });

    it('should convert double input/output Solidity method to ABI', () => {
      const doubleMethodABI = solidityToABI('anotherMethod(bool _yes, address _addr):(uint256 balance, uint8 num)');

      assert.equal(typeof doubleMethodABI, 'object');
      assert.equal(doubleMethodABI.type, 'function');
      assert.equal(doubleMethodABI.outputs.length, 2);
      assert.equal(doubleMethodABI.inputs.length, 2);
      assert.equal(doubleMethodABI.name, 'anotherMethod');
      assert.equal(doubleMethodABI.inputs[0].name, '_yes');
      assert.equal(doubleMethodABI.inputs[0].type, 'bool');
      assert.equal(doubleMethodABI.inputs[1].name, '_addr');
      assert.equal(doubleMethodABI.inputs[1].type, 'address');
      assert.equal(doubleMethodABI.outputs[0].name, 'balance');
      assert.equal(doubleMethodABI.outputs[0].type, 'uint256');
      assert.equal(doubleMethodABI.outputs[1].name, 'num');
      assert.equal(doubleMethodABI.outputs[1].type, 'uint8');
    });

    it('should convert no input/output Solidity method to ABI', () => {
      const doubleMethodABI = solidityToABI('anotherMethod()');

      assert.equal(typeof doubleMethodABI, 'object');
      assert.equal(doubleMethodABI.type, 'function');
      assert.equal(doubleMethodABI.outputs.length, 0);
      assert.equal(doubleMethodABI.inputs.length, 0);
      assert.equal(doubleMethodABI.name, 'anotherMethod');
    });

    it('should convert single input, no output Solidity method to ABI', () => {
      const singleMethodABI = solidityToABI('aMethod(address _addr)');

      assert.equal(typeof singleMethodABI, 'object');
      assert.equal(singleMethodABI.type, 'function');
      assert.equal(singleMethodABI.name, 'aMethod');
      assert.equal(singleMethodABI.inputs.length, 1);
      assert.equal(singleMethodABI.inputs[0].name, '_addr');
      assert.equal(singleMethodABI.inputs[0].type, 'address');
      assert.equal(singleMethodABI.outputs.length, 0);
    });

    it('no method names Solidity string to ABI', () => {
      const noNameMethodABI = solidityToABI('aMethod(address,uint256):(uint4,bool yes,bool)');

      assert.equal(typeof noNameMethodABI, 'object');
      assert.equal(noNameMethodABI.type, 'function');
      assert.equal(noNameMethodABI.name, 'aMethod');
      assert.equal(noNameMethodABI.inputs.length, 2);
      assert.equal(noNameMethodABI.inputs[0].name, '');
      assert.equal(noNameMethodABI.inputs[0].type, 'address');
      assert.equal(noNameMethodABI.inputs[1].name, '');
      assert.equal(noNameMethodABI.inputs[1].type, 'uint256');
      assert.equal(noNameMethodABI.outputs[0].name, '');
      assert.equal(noNameMethodABI.outputs[0].type, 'uint4');
      assert.equal(noNameMethodABI.outputs.length, 3);
    });

    it('should convert single output, no input Solidity method to ABI', () => {
      const singleMethodABI = solidityToABI('aMethod():(uint4 something)');

      assert.equal(typeof singleMethodABI, 'object');
      assert.equal(singleMethodABI.type, 'function');
      assert.equal(singleMethodABI.name, 'aMethod');
      assert.equal(singleMethodABI.inputs.length, 0);
      assert.equal(singleMethodABI.outputs[0].name, 'something');
      assert.equal(singleMethodABI.outputs[0].type, 'uint4');
      assert.equal(singleMethodABI.outputs.length, 1);
    });
  });
});
