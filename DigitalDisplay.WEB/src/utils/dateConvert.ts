import moment from 'moment';

export default function convertDate(date: Date) {
  return moment(date).format('MM/DD/YYYY');
}
