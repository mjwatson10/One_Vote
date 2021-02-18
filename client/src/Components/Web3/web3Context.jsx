import React, { useState, useEffect } from 'react';

import Web3 from 'web3';
import { contractAddress, abi } from '../../contract.js';

const Web3Context = React.createContext();
