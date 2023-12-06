
# with open("AerobicData.json", "r") as file:
#     lines = file.readlines()

# lines_with_comma = [line.strip() + "," for line in lines]


# with open('AerobicData2.json', 'w') as file:
#     file.writelines(lines_with_comma)


import json

x = []
y = []
with open("userLocationData.json", "r") as file:
    data = json.load(file)

for d in data["dataList"]:
    x.append(d["X"])
    y.append(d["Y"])

print(min(x))
print(min(y))
print(max(x))
print(max(y))