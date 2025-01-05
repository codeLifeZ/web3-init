import type { BigNumber } from '@ethersproject/bignumber'
import type { Web3ReactHooks } from '@web3-react/core'
import { formatEther } from 'ethers'
import { useEffect, useState } from 'react'

function useBalances(provider: ReturnType<Web3ReactHooks['useProvider']>, accounts?: string[]) {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (accounts?.length && provider) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances)
        }
      })
      return () => {
        stale = true
        setBalances(undefined)
      }
    }
    return
  }, [provider, accounts])

  return balances
}

export const Accounts = ({
  accounts,
  provider,
  ensNames
}: {
  accounts?: ReturnType<Web3ReactHooks['useAccounts']>
  provider?: ReturnType<Web3ReactHooks['useProvider']>
  ensNames: ReturnType<Web3ReactHooks['useENSNames']>
}) => {
  const balances = useBalances(provider, accounts)

  return (
    <div>
      {accounts?.length === 0
        ? 'None'
        : accounts?.map((account, index) => (
            <div key={index}>
              {ensNames[index] ?? account}
              {balances ? `: ${formatEther(balances[index].toHexString())} ETH` : null}
            </div>
          ))}
    </div>
  )
}
