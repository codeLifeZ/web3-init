import { Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Dispatch, SetStateAction } from 'react'

import { getName } from './utils'
import { Accounts } from './Accounts'
import { Chain } from './Chain'
import { ConnectWithSelect } from './ConnectWithSelect'
import { Status } from './Status'

interface CardProps {
  connector: MetaMask
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[]
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: Dispatch<SetStateAction<Error | undefined>>
  ensNames: ReturnType<Web3ReactHooks['useENSNames']>
  provider?: ReturnType<Web3ReactHooks['useProvider']>
  accounts?: string[]
}
export const Card = ({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError,
  ensNames,
  provider,
  accounts
}: CardProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        padding: '1 rem',
        margin: '1 rem',
        overflow: 'auto',
        border: 'lpx solid',
        borderRadius: '1 rem'
      }}
    >
      <b>{getName(connector)}</b>
      <div style={{ marginBottom: '1 rem' }}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
      </div>
      <Chain chainId={activeChainId} />
      <div style={{ marginBottom: '1 rem' }}>
        <Accounts accounts={accounts} provider={provider} ensNames={ensNames} />
      </div>
      <ConnectWithSelect
        connector={connector}
        activeChainId={activeChainId}
        chainIds={chainIds}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </div>
  )
}
