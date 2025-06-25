import { Button, ButtonText } from "@/components/ui/button";
import {
    FormControl,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useUpdateStadium } from "@/entities";
import React from "react";
import { View } from "react-native";

export default function EditStadium() {
    const [name, setName] = React.useState<{ name: string }>({ name: "" });
    // const router = useRouter();
    const patchStadium = useUpdateStadium();
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
                        patchStadium.mutate({
                            stadiumId: "1",
                            name: name.name,
                        });
                        // router.replace("./index");
                    }}
                >
                    <ButtonText>Submit</ButtonText>
                </Button>
            </VStack>
        </View>
    );
}
