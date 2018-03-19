<li>
  <Link to="/docs/your-uniquely-named-route">
    Section title goes here
  </Link>
</li>

[
  // root evaluates to /docs
  {
    path: `${root}/your-uniquely-named-route`,
    main: () => <Content mdfPath={PathReference} />
  }
]