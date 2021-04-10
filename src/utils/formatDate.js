/* eslint-disable import/no-duplicates */
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formatDate = (date) => {
  const newDate = parseISO(date);
  return format(newDate, `dd MMM yy`, { locale: ptBR });
};

export default formatDate;
