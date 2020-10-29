import s from './CostTable.module.scss';

interface Props {
  productsCost: number;
  deliveryCost: number;
}

const CostTable: React.FC<Props> = ({ productsCost, deliveryCost }) => {
  const total = productsCost + deliveryCost;

  return (
    <table className={s.table}>
      <tbody>
        <tr>
          <td>Subtotal</td>
          <td>{productsCost} SEK</td>
        </tr>
        <tr>
          <td>Delivery</td>
          <td>{deliveryCost} SEK</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{total} SEK</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CostTable;
