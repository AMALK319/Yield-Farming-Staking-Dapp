import React from 'react';
import { useEffect, useState } from 'react';

import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import Rwd from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';

import Main from './Main'

import Navbar from './navbar/Navbar';
import '../styles/App.css';

const App = () => {

    const [address, setAddress] = useState('0x0');
    const [tether, setTether] = useState({});
    const [rwd, setRwd] = useState({});
    const [decentralBank, setDecentralBank] = useState({});
    const [tetherBalance, setTetherBalance] = useState(0);
    const [rwdBalance, setRwdBalance] = useState(0);
    const [stackingBalance, setStackingBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            }
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            }
            else {
                window.alert('No ethereum browser detected! You can check out MetaMask.')
            }
        }
        const loadBlockchainData = async () => {
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();
            const networkID = await web3.eth.net.getId();
            setAddress(accounts[0]);

            //load Tether contract
            const tether = loadContract(Tether, networkID, web3);
            setTether(tether);

            let tetherBalance = await tether.methods.balanceOf(accounts[0]).call();
            setTetherBalance(tetherBalance);

            //load Tether contract
            const rwd = loadContract(Rwd, networkID, web3);
            setRwd(rwd);
            let rwdBalance = await rwd.methods.balanceOf(accounts[0]).call();
            setRwdBalance(rwdBalance);

            //load decentralBank contract
            const decentralBank = loadContract(DecentralBank, networkID, web3);
            setDecentralBank(decentralBank);
            let stackingBalance = await decentralBank.methods.stackingBalance(accounts[0]).call();
            setStackingBalance(stackingBalance);
            console.log(stackingBalance);

            setLoading(false)

        }
        loadWeb3();
        loadBlockchainData();
    }, []);



    const loadContract = (contract, networkId, web3) => {
        const contractData = contract.networks[networkId];
        try {
            const result = new web3.eth.Contract(contract.abi, contractData.address)
            return result;
        } catch (error) {
            window.alert(contract + ' not deployed to the network ')
        }
    }

    const stakeTokens = (amount) => {
        setLoading(true);
        console.log(tether.methods);

        tether.methods.approve(decentralBank._address, amount).send({ from: address }).on('transactionHash', (hash) => {
            decentralBank.methods.stakeTokens(amount).send({ from: address }).on('transactionHash', (hash) => {

                setLoading(false);

            })
        }
        )
    }

    console.log(stackingBalance);



    return (
        <div className='main'>
            <Navbar address={address} />
            {loading ? <span style={{ color: 'white'}}>Loading...</span> :
                <Main stackingBalance={stackingBalance} rewardBalance={rwdBalance} balance={tetherBalance} stakeTokens={stakeTokens} />
            }
        </div>
    );
};

export default App;
