import type { Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import { CHAINS, getAddChainParameters } from './chains'

const ChainSelect = ({
  activeChainId,
  switchChain,
  chainIds
}: {
  activeChainId: number
  switchChain: (chainId: number) => void
  chainIds?: number[]
}) => {
  return (
    <select
      value={activeChainId}
      onChange={(event) => switchChain(Number(event.target.value))}
      disabled={switchChain === undefined}
      id=""
    >
      <option hidden disabled>
        Select chain
      </option>
      <option value={-1}>Default</option>
      {(chainIds || Object.keys(CHAINS)).map((chainId: any) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  )
}

export const ConnectWithSelect = ({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError
}: {
  connector: MetaMask
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[]
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: Dispatch<SetStateAction<Error | undefined>>
}) => {
  const [desiredChainId, setDesiredChainId] = useState<number>(0)
  useEffect(() => {
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId)
    }
  }, [desiredChainId, activeChainId])

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId)
      try {
        if (desiredChainId === activeChainId || (desiredChainId === -1 && activeChainId !== undefined)) {
          setError(undefined)
          return
        }
        if (desiredChainId === -1) {
          await connector.activate()
          return
        } else {
          await connector.activate(getAddChainParameters(desiredChainId))
        }
      } catch (error) {
        setError(error as Error)
      }
    },
    [connector, activeChainId, setError]
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem' }}>
        <ChainSelect
          activeChainId={desiredChainId}
          switchChain={switchChain}
          chainIds={chainIds as number[]}
        />
        {isActive ? (
          error ? (
            <button onClick={() => switchChain(desiredChainId)}>Try again</button>
          ) : (
            <button
              onClick={() => {
                if (connector?.deactivate) {
                  void connector.deactivate()
                } else {
                  void connector.resetState()
                }
                setDesiredChainId(-1)
              }}
            >
              Disconnect
            </button>
          )
        ) : (
          // disabled={isActivating || !desiredChainId}
          <button onClick={() => switchChain(desiredChainId)}>{error ? 'Try again' : 'Connect'}</button>
        )}
      </div>
    </div>
  )
}
