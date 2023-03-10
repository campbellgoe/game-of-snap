const EndMessage = ({ className = '', totalSuits, totalValues }) => {
  return <div className={className + ' EndMessage'}>
    <p>VALUE MATCHES: {totalValues}</p>
    <p>SUIT MATCHES: {totalSuits}</p>
  </div>
}

export default EndMessage
