function formatResultData({ res, total = null, limitNum = null, pageNum = null, apiEndPoint = "", queryString = "", result = [], totalResults = null }) {
  const totalPages = Math.ceil(total / limitNum);
  const links = [
    {
      url: pageNum > 1 ? `${ process.env.API_URL }/${ apiEndPoint }?page=${ pageNum - 1 }&limit=${ limitNum }${ queryString ? '&' + queryString : '' }` : null,
      label: "Previous",
      active: false
    },
    {
      url: `${ process.env.API_URL }/${ apiEndPoint }?page=1&limit=${ limitNum }${ queryString ? '&' + queryString : '' }`,
      label: "1",
      active: pageNum === 1
    }
  ];

  for (let i = 2; i <= totalPages; i++) {
    links.push({
      url: `${ process.env.API_URL }/${ apiEndPoint }?page=${ i }&limit=${ limitNum }${ queryString ? '&' + queryString : '' }`,
      label: `${ i }`,
      active: pageNum === i
    });
  }

  links.push({
    url: pageNum < totalPages ? `${ process.env.API_URL }/${ apiEndPoint }?page=${ pageNum + 1 }&limit=${ limitNum }${ queryString ? '&' + queryString : '' }` : null,
    label: "Next",
    active: false
  });


  res.json({
    status: 'success',
    message: 'Executed Successfully',
    results: {
      total: result?.length,
      totalResults: totalResults,
      data: result,
      first_page_url: `${ process.env.API_URL }/${ apiEndPoint }?page=1&limit=${ limitNum }${ queryString ? '&' + queryString : '' }`,
      last_page_url: pageNum < totalPages ? `${ process.env.API_URL }/${ apiEndPoint }?page=${ totalPages }&limit=${ limitNum }${ queryString ? '&' + queryString : '' }` : null,
      prev_page_url: pageNum !== 1 ? `${ process.env.API_URL }/${ apiEndPoint }?page=${ pageNum - 1 }&limit=${ limitNum }${ queryString ? '&' + queryString : '' }` : null,
      links: links,
      next_page_url: pageNum < totalPages ? `${ process.env.API_URL }/${ apiEndPoint }?page=${ pageNum + 1 }&limit=${ limitNum }${ queryString ? '&' + queryString : '' }` : null,
      current_page: pageNum,
      last_page: totalPages,
      totalPages: totalPages,
      per_page: limitNum
    }
  });


}

module.exports = formatResultData;