'use client'

import { MockActionBridge } from '@components/utils/MockActionBridge'

import { setupBusinessMock, resetBusinessMock } from '@business/_lib/actions.mocks'

import { BusinessTest } from '@business/_lib/test.ids'

const TestBridgeWrapper = () => (
  <div aria-hidden='true' className='opacity-0 absolute top-[100vh]'>
    <MockActionBridge
      action={setupBusinessMock}
      formIds={BusinessTest.setup} />

    <MockActionBridge
      action={resetBusinessMock}
      formIds={BusinessTest.reset} />
  </div>
)

export default TestBridgeWrapper