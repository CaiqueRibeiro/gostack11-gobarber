import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(
    @inject('AppointmentsRepository') repository: IAppointmentsRepository,
  ) {
    this.appointmentsRepository = repository;
  }

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      // The day to be compared. Each day will be compared to know if
      // It's a passed day (23:59:59 to make today not passed day)
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      // Filter just the appointments that are booked for the day verified in iteration
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      // It's available if not a passed day and there's less than 10 appointments
      // (because 8:00 ~ 17:00 can only have 10 appointments)
      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}
export default ListProviderMonthAvailabilityService;
