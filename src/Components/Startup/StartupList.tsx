import { Grid, Pagination, Paper, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup"

const ITEMS_PAGINATION = 20

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchStartups()
  }, [])

  async function fetchStartups() {
    try {
      const _startups = await StartupHttpService.getStartups()
      setStartups(_startups)
    } catch (err) {
      console.error(err)
    }
  }

  function caption(startup: Startup) {
    const foundYear = startup?.dateFounded?.getFullYear()
    return `Founded: ${foundYear} | ${startup.employees} Employees | $ ${startup.totalFunding} Mio. | ${startup.currentInvestmentStage}`
  }

  function handleChange(_: any, page: number) {
    setPage(page)
  }

  if (!startups) return (<></>);
  
  const itemsCount = (page - 1) * ITEMS_PAGINATION

  return (
    <div id="startup-list">
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
      <Grid id="startup-list" container >
        {startups.slice(itemsCount, itemsCount + 20).map(startup => (
          <Grid item width="100%" key={startup.id}>
            <Paper sx={{ padding: '.75rem', marginBottom: '.5rem' }} >
              <Typography variant="h5">{startup.name}</Typography>
              <Typography variant="caption">{caption(startup)}</Typography>
              <Typography sx={{ marginTop: '0.5rem' }}>{startup.shortDescription}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>);
}
