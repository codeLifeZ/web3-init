import { useEffect, useState } from 'react'

import { hooks, metaMask } from '../connector/metaMask'
import { Card } from './Card'
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export const MetaMaskCard = () => {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()
  const ensNames = useENSNames(provider)

  const [error, setError] = useState<Error | undefined>(undefined)

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.log('Failed to connect eagerly to MetaMask')
    })
  }, [])

  return (
    <Card
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      ensNames={ensNames}
      provider={provider}
    ></Card>
    // <div>fdsfdsfs</div>
  )
}
