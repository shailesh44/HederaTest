// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Score {

   function sendToContract() external payable{
   }

   function checkContractBalance() public view returns(uint256){
       return address(this).balance;
   }
}