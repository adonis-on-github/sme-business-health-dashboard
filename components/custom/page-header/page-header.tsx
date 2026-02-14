import { PageHeaderTestID } from './test.ids'

type PageHeaderProps = {
  title: string
  description?: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => (
  <header
    className='mb-8 space-y-2'
    data-testid={PageHeaderTestID.header}
  >
    <h1
      className='text-3xl font-bold tracking-tight text-slate-900' data-testid={PageHeaderTestID.title}
    >
      {title}
    </h1>

    {description && (
      <p
        className='text-sm text-slate-500'
        data-testid={PageHeaderTestID.description}
      >
        {description}
      </p>
    )}
  </header>
)

export default PageHeader