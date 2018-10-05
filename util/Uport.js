import { Connect, SimpleSigner, MNID } from 'uport-connect'

const uport = new Connect('React uPort IPFS DApp', {
  clientId: '',
  network: 'rinkeby',
  signer: SimpleSigner()
})

const initAccount = async () => {

  const user = await uport.requestCredentials({
    requested: ['name', 'country', 'avatar'],
    notifications: true
  })

  const decodedId = MNID.decode(user.address)
  const specificNetworkAddress = decodedId.address
  return { specificNetworkAddress, user }

}

const web3 = uport.getWeb3()
export { web3, uport, MNID, initAccount }
