import { useState, useCallback, useEffect } from 'react';
import { ITicker } from '../../interfaces/tickerInterface';
import { Loader } from '../../components/common/Loader';
import { getData } from '../../utils/axiosConfig'
import { toast } from 'react-toastify';
import { ENDPOINTS } from '../../utils/endpoints'


const HomePage = () => {
  const [tickers, setTickers] = useState<ITicker[]>([])
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  
  const [pageIndex, setPageIndex] = useState(1);


  const nextPage = () => {
    setPageIndex(pageIndex + 1);
    setStartIndex(startIndex + 10);
  };

  const previousPage = () => {
    if (startIndex <= 0) {
      return;
    }
    setPageIndex(pageIndex - 1);
    setStartIndex(startIndex - 10);
  };

  const fetchTickers = useCallback(async () => {
    setLoading(true);
    const url = `${ENDPOINTS.Tickers.main}/?start=${startIndex}&limit=10`

    try {
      const responseData = await getData(url)
      const tickerData = responseData.data
      setTickers(tickerData)
    } catch (error) {
      toast.error('Error fetching ticker data');
    } finally {
      setLoading(false);
    }
  }, [startIndex]);

  useEffect(() => {
    fetchTickers();
  }, [fetchTickers]);

  let tableHead = (
    <thead>
      <tr>
        <th className='font-bold text-black text-base'>Coin</th>
        <th className='font-bold text-black text-base'>Code</th>
        <th className='font-bold text-black text-base'>Price</th>
        <th className='font-bold text-black text-base'>Total Supply</th>
      </tr>
    </thead>
  );

  let tableBody = (
    <tbody>
      {tickers.map((ticker) => (
        <tr key={ticker.id}>
          <td>{ticker.name}</td>
          <td>{ticker.symbol}</td>
          <td>{`$${ticker.price_usd}`}</td>
          <td>{ticker.tsupply}</td>
        </tr>
      ))}
    </tbody>
  );

  let mobileTableBody = (
    <tbody>
      {tickers.map((ticker) => (
        <tr key={ticker.id} className='grid grid-cols-2'>
          <div className='flex flex-col'>
            <th>Coin</th>
            <td>{ticker.name}</td>
            <th>Price</th>
            <td>{`$${ticker.price_usd}`}</td>
          </div>
          <div className='flex flex-col'>
            <th>Code</th>
            <td>{ticker.symbol}</td>
            <th>Total Supply</th>
            <td>{ticker.tsupply}</td>
          </div>
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className=''>
      {/* Desktop View */}
      <div className='hidden md:flex justify-center items-center h-screen'>
        {loading ? (
          <Loader />
        ) : (
          <div className='w-[600px]'>
            <table className='table table-zebra'>
              {tableHead}
              {tableBody}
            </table>
            <div className='flex justify-between mt-4'>
              <div className='col-span-1'>
                <button
                  className={`btn btn-link ${
                    startIndex === 0 ? 'hidden' : ''
                  } no-underline`}
                  onClick={previousPage}
                >
                  <i className='bi bi-arrow-left'></i>
                  Previous
                </button>
              </div>
              <div className='col-span-1'>
                <button
                  className='btn btn-link no-underline'
                  onClick={nextPage}
                >
                  Next
                  <i className='bi bi-arrow-right'></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className='md:hidden'>
        {loading ? (
          <Loader />
        ) : (
          <div className='w-full p-4'>
            <table className='table table-zebra'>{mobileTableBody}</table>
            <div className='flex justify-between mt-4'>
              <div className='col-span-1'>
                <button
                  className={`btn btn-link ${
                    startIndex === 0 ? 'hidden' : ''
                  } no-underline`}
                  onClick={previousPage}
                >
                  <i className='bi bi-arrow-left'></i>
                  Previous
                </button>
              </div>
              <div className='col-span-1'>
                <button
                  className='btn btn-link no-underline'
                  onClick={nextPage}
                >
                  Next
                  <i className='bi bi-arrow-right'></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { HomePage };
