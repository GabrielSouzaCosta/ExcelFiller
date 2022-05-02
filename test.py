import datetime

date_time = datetime.datetime.now()
date = datetime.date.today()
date1 = date.strftime("%d-%m-%Y")
print(date1)
date2 = date.strftime("%d")
print(date2)

hour = date_time.strftime("%H:%M")
print(hour)

