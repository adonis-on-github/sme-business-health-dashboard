import { LogoID } from './test.ids'

export const Logo = () => (
  <div className='flex-1 text-slate-700 text-center sm:text-left' data-testid={LogoID.root}>
    <span className='text-emerald-700' data-testid={LogoID.first}>SME</span>{' '}
    <span className='text-indigo-600' data-testid={LogoID.second}>Business</span>{' '}
    <span className='text-orange-500' data-testid={LogoID.third}>Health</span>
  </div>
)

