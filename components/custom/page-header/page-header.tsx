type PageHeaderProps = {
  title: string
  description?: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => (
  <header className='mb-8 space-y-2'>
    <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
      {title}
    </h1>

    {description && (
      <p className='text-sm text-slate-500'>
        {description}
      </p>
    )}
  </header>
)

export default PageHeader