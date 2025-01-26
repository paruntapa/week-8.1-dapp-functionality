import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const RequestAirdrop = () => {
    const wallet = useWallet()
    const [amount, setAmount] = useState('')
    const [balance, setBalance] = useState(0)

    const { connection } = useConnection()

    const publicKey = wallet.publicKey

    const requestAirdrop = async () => {
        connection.requestAirdrop(publicKey, amount * 1000000000)
        alert('Requested airdrop...') 
    }

    const showBalance = async () => {
        const balance = await connection.getBalance(wallet.publicKey)
        setBalance(balance / 1000000000)
    }
    useEffect(() => {
        showBalance()
        if(wallet.disconnect) {
            setBalance(0)
        }
    }, [publicKey])

    
  return (
    <div className="h-screen w-screen flex justify-center flex-col items-center">
        <WalletMultiButton />
        <br />
        My Public Key <br />
        <b>
        {wallet.publicKey?.toString()} 
        </b> <br /> <br />
        <br />
        My Balance <br />
        <b>
        {balance} SOL
        </b> <br /> <br />
        <input className='p-4 rounded-md' onChange={(e) =>{setAmount(e.target.value)}} type="text" placeholder='amount...' /><br /> <br />
        
        <button onClick={requestAirdrop}>Request Airdrop</button>
    </div>
  )
}

export default RequestAirdrop