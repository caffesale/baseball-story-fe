import { TStadium } from "@/components/logic/home-stadium-form";
import { Button, ButtonText } from "@/components/ui/button";
import {
    FormControl,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

type TEditStadium = Pick<TStadium, "name">;

export default function EditStadium() {
    const [name, setName] = React.useState<TEditStadium>({ name: "" });
    const router = useRouter();
    return (
        <View className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
            <VStack>
                <FormControl size="md">
                    <FormControlLabel>
                        <FormControlLabelText>name</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            type="text"
                            value={name.name}
                            onChangeText={(value) =>
                                setName({
                                    name: value,
                                })
                            }
                            placeholder="홍길동의 홈구장"
                        />
                    </Input>
                    <FormControlHelperText>
                        홈구장 이름은 닉네임으로 사용됩니다.
                    </FormControlHelperText>
                </FormControl>
                <Button
                    size="md"
                    variant="outline"
                    onPress={() => {
                        console.log({ name }, "form Submitted!");
                        router.replace("./index");
                    }}
                >
                    <ButtonText>Submit</ButtonText>
                </Button>
            </VStack>
        </View>
    );
}
